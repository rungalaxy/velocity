import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable, type DataTableColumn, type DataTableProps } from "./DataTable";

interface Race {
  id: string;
  name: string;
  date: string;
  status: "Registration open" | "Sold out" | "Closed";
  participants: number;
}

const sampleRows: Race[] = [
  { id: "1", name: "Paris Marathon", date: "Apr 6, 2025", status: "Registration open", participants: 42000 },
  { id: "2", name: "Nice Half Marathon", date: "Mar 2, 2025", status: "Sold out", participants: 8500 },
  { id: "3", name: "Ridge Trail Run", date: "Oct 12, 2025", status: "Registration open", participants: 1200 },
  { id: "4", name: "Lyon 10K", date: "Jun 15, 2025", status: "Closed", participants: 5300 },
  { id: "5", name: "Marseille Coastal Run", date: "Sep 21, 2025", status: "Registration open", participants: 3100 },
];

const columns: DataTableColumn<Race>[] = [
  { key: "name", header: "Event", cell: (row) => row.name },
  { key: "date", header: "Date", cell: (row) => row.date },
  { key: "status", header: "Status", cell: (row) => row.status },
  {
    key: "participants",
    header: "Participants",
    align: "end",
    cell: (row) => row.participants.toLocaleString(),
  },
];

// `DataTable` is generic — alias it to a concrete row type so Storybook's
// `Meta`/`StoryObj` inference can type `args` correctly.
const RaceDataTable = DataTable as React.ComponentType<DataTableProps<Race>>;

const meta: Meta<typeof RaceDataTable> = {
  title: "Components/DataTable",
  component: RaceDataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Data grid built on `Table` with a leading checkbox column for row selection (select-all in the header, per-row checkboxes in the body). Built on Base UI's `Checkbox` primitive under the hood via Velocity's `Checkbox` component.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    striped: { control: "boolean" },
    selectionMode: { control: "select", options: ["none", "multiple"] },
  },
  args: {
    columns,
    data: sampleRows,
    getRowKey: (row: Race) => row.id,
    getRowLabel: (row: Race) => row.name,
    size: "md",
    striped: false,
    selectionMode: "multiple",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Selection: Story = {
  render: (args) => {
    function SelectionDemo() {
      const [selected, setSelected] = React.useState<Set<string>>(
        () => new Set(["2"]),
      );
      return (
        <div className="flex flex-col gap-3">
          <p className="text-sm text-content-secondary">
            {selected.size} of {sampleRows.length} selected
          </p>
          <DataTable
            {...args}
            selectedKeys={selected}
            onSelectionChange={setSelected}
          />
        </div>
      );
    }
    return <SelectionDemo />;
  },
};

export const DisabledRows: Story = {
  args: {
    isRowDisabled: (row: Race) => row.status === "Sold out" || row.status === "Closed",
    defaultSelectedKeys: ["1"],
  },
};

export const NoSelection: Story = {
  args: {
    selectionMode: "none",
  },
};

export const Empty: Story = {
  args: {
    data: [],
  },
};

export const Striped: Story = {
  args: {
    striped: true,
  },
};

export const Overview: Story = {
  render: () => (
    <div className="flex flex-col gap-8 p-8 rounded-2xl bg-surface-primary">
      <div>
        <p className="mb-2 text-sm font-medium text-content-secondary">Default</p>
        <DataTable
          columns={columns}
          data={sampleRows}
          getRowKey={(row) => row.id}
          getRowLabel={(row) => row.name}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-content-secondary">
          Striped, sm size
        </p>
        <DataTable
          columns={columns}
          data={sampleRows}
          getRowKey={(row) => row.id}
          getRowLabel={(row) => row.name}
          size="sm"
          striped
          defaultSelectedKeys={["1", "3"]}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-content-secondary">
          Disabled rows
        </p>
        <DataTable
          columns={columns}
          data={sampleRows}
          getRowKey={(row) => row.id}
          getRowLabel={(row) => row.name}
          isRowDisabled={(row) => row.status !== "Registration open"}
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-content-secondary">
          No selection column
        </p>
        <DataTable
          columns={columns}
          data={sampleRows}
          getRowKey={(row) => row.id}
          selectionMode="none"
        />
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-content-secondary">Empty state</p>
        <DataTable
          columns={columns}
          data={[]}
          getRowKey={(row: Race) => row.id}
        />
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
