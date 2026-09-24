import React from 'react';
import './Table.css';

export const Table = ({ children, className = '', ...props }) => (
  <div className="table-container">
    <table className={`table ${className}`} {...props}>
      {children}
    </table>
  </div>
);

export const TableHeader = ({ children, ...props }) => (
  <thead className="table-header" {...props}>
    {children}
  </thead>
);

export const TableBody = ({ children, ...props }) => (
  <tbody className="table-body" {...props}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = '', ...props }) => (
  <tr className={`table-row ${className}`} {...props}>
    {children}
  </tr>
);

export const TableHead = ({ children, className = '', ...props }) => (
  <th className={`table-head ${className}`} {...props}>
    {children}
  </th>
);

export const TableCell = ({ children, className = '', ...props }) => (
  <td className={`table-cell ${className}`} {...props}>
    {children}
  </td>
);
