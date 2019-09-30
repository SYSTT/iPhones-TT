import React, { useState, DetailedHTMLProps, HTMLAttributes } from 'react';
import { Table, Input, Popconfirm, Form, Button } from 'antd';
import { FormComponentProps, WrappedFormUtils } from 'antd/lib/form/Form';

import { Configuration } from '../../modules/stock';

const EditableContext = React.createContext<WrappedFormUtils | null>(null);

type HtmlElementProps<T> = DetailedHTMLProps<
  HTMLAttributes<T>,
  T
>;

const EditableRow = ({ form, ...props }: FormComponentProps & HtmlElementProps<HTMLTableRowElement>) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

type EditableTableProps = HtmlElementProps<HTMLTableCellElement> & {
  editable: boolean;
  dataIndex: keyof KeyedConfiguration;
  title: () => string;
  record: KeyedConfiguration;
  index: number;
  handleSave: (record: KeyedConfiguration) => void;
  children: React.ReactNode,
};

class EditableCell extends React.Component<EditableTableProps> {
  state = {
    editing: false,
    inputRef: React.createRef<Input>(),
  };

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing && this.state.inputRef.current) {
        this.state.inputRef.current.focus();
      }
    });
  };

  save = (
    form: WrappedFormUtils,
    e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>
  ) => {
    const { record, handleSave } = this.props;
    form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = (form: WrappedFormUtils | null) => {
    if (form === null) {
      return;
    }
    const { children, dataIndex, record, title } = this.props;
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          rules: [
            {
              required: true,
              message: `${title} is required.`,
            },
          ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={this.state.inputRef}
            onPressEnter={e => this.save(form, e)}
            onBlur={e => this.save(form, e)}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

type KeyedConfiguration = Configuration & {
  key: string;
};

type Props = {
  configurationStock: KeyedConfiguration[];
};

function StockTable({ configurationStock }: Props) {
  const [dataSource, setDataSource] = useState(configurationStock);

  const handleDelete = (key: string) => {
    /* TODO: Delete from firestore as well
     */
    setDataSource(dataSource.filter(item => item.key !== key));
  };

  // const handleAdd = (newConfig: Configuration) => {
  //   const newData = {
  //     key: `${newConfig.condition}-${newConfig.memory}`,
  //     ...newConfig,
  //   };
  //   setDataSource([...dataSource, newData]);
  // };

  const handleSave = (row: KeyedConfiguration) => {
    const newData = [...dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableFormRow,
      cell: EditableCell,
    },
  };

  const stockColumns = [
    {
      title: 'Condition',
      dataIndex: 'condition',
      key: 'condition',
    },
    {
      title: 'Memory',
      dataIndex: 'memory',
      key: 'memory',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      editable: true,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text: string, record: KeyedConfiguration) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <Button type="link" style={{ padding: 0 }}>Delete</Button>
          </Popconfirm>
        ) : null,
    },
  ];

  const columns = stockColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: KeyedConfiguration) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  return (
    <div>
      {/* <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button> */}
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default StockTable;
