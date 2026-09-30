import React from 'react';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
  className?: string;
  wrapperClassName?: string;
}

export const Table: React.FC<TableProps> = ({
  children,
  className = '',
  wrapperClassName = '',
  ...props
}) => {
  return (
    <div
      className={`w-full overflow-x-auto rounded-xl border border-gray-200/80 bg-white shadow-xs scrollbar-thin ${wrapperClassName}`}
    >
      <table className={`w-full text-left border-collapse text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <thead className={`bg-gray-50/80 text-xs font-bold text-gray-700 uppercase tracking-wider border-b border-gray-200 ${className}`} {...props}>
      {children}
    </thead>
  );
};

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <tbody className={`divide-y divide-gray-100 text-gray-700 ${className}`} {...props}>
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <tr className={`hover:bg-gray-50/60 transition-colors ${className}`} {...props}>
      {children}
    </tr>
  );
};

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <td className={`px-4 sm:px-6 py-3.5 sm:py-4 whitespace-nowrap text-sm ${className}`} {...props}>
      {children}
    </td>
  );
};

export const TableHeaderCell: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <th className={`px-4 sm:px-6 py-3.5 whitespace-nowrap font-bold ${className}`} {...props}>
      {children}
    </th>
  );
};
