import React from 'react';
import DataTable from 'react-data-table-component';
import { FaPills, FaDollarSign } from 'react-icons/fa';

const ReportTable = ({ data, loading }) => {
    const columns = [
        {
            name: 'Order ID',
            selector: row => row.orderId,
            sortable: true,
            width: '120px',
            cell: row => (
                <div className="font-medium text-blue-600">
                    {row.orderId}
                </div>
            )
        },
        {
            name: 'Medicine',
            selector: row => row.medicineName,
            sortable: true,
            grow: 2,
            cell: row => (
                <div className="flex items-center">
                    <FaPills className="h-4 w-4 text-blue-500 mr-2" />
                    <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                            {row.medicineName}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {row.medicineCategory}
                        </div>
                    </div>
                </div>
            )
        },
        {
            name: 'Seller',
            selector: row => row.sellerEmail,
            sortable: true,
            cell: row => (
                <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {row.sellerName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {row.sellerEmail}
                    </div>
                </div>
            )
        },
        {
            name: 'Buyer',
            selector: row => row.buyerEmail,
            sortable: true,
            cell: row => (
                <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {row.buyerName}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                        {row.buyerEmail}
                    </div>
                </div>
            )
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
            sortable: true,
            width: '100px',
            center: true,
            cell: row => (
                <div className="text-center">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        {row.quantity}
                    </span>
                </div>
            )
        },
        {
            name: 'Total Price',
            selector: row => row.totalPrice,
            sortable: true,
            width: '120px',
            cell: row => (
                <div className="flex items-center font-bold text-green-600">
                    <FaDollarSign className="h-3 w-3 mr-1" />
                    {row.totalPrice.toFixed(2)}
                </div>
            )
        },
        {
            name: 'Sale Date',
            selector: row => row.saleDate,
            sortable: true,
            width: '120px',
            cell: row => (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(row.saleDate).toLocaleDateString()}
                </div>
            )
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            width: '100px',
            center: true,
            cell: row => (
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${row.status === 'completed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : row.status === 'pending'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                    {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
            )
        }
    ];

    const customStyles = {
        header: {
            style: {
                minHeight: '56px',
            },
        },
        headRow: {
            style: {
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                borderTopColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
            },
        },
        headCells: {
            style: {
                color: '#374151',
                fontSize: '12px',
                fontWeight: '600',
                textTransform: 'uppercase',
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
        rows: {
            style: {
                minHeight: '72px',
                '&:not(:last-of-type)': {
                    borderBottomStyle: 'solid',
                    borderBottomWidth: '1px',
                    borderBottomColor: '#e5e7eb',
                },
                '&:hover': {
                    backgroundColor: '#f9fafb',
                },
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
    };

    const paginationComponentOptions = {
        rowsPerPageText: 'Rows per page:',
        rangeSeparatorText: 'of',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'All',
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <DataTable
                title="Sales Report Data"
                columns={columns}
                data={data}
                pagination
                paginationComponentOptions={paginationComponentOptions}
                progressPending={loading}
                progressComponent={
                    <div className="flex items-center justify-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                }
                noDataComponent={
                    <div className="text-center py-8">
                        <FaPills className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400">No sales data found</p>
                    </div>
                }
                customStyles={customStyles}
                dense
                striped
                highlightOnHover
                responsive
                selectableRows
                selectableRowsHighlight
                fixedHeader
                fixedHeaderScrollHeight="400px"
            />
        </div>
    );
};

export default ReportTable;
