import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import DataTable from './ExpandedTable';
import baseURL from "../../../../Url/NodeBaseURL";

const RepairsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [purchasesRes, rateCutsRes] = await Promise.all([
          fetch(`${baseURL}/get/purchases`),
          fetch(`${baseURL}/rateCuts`)
        ]);

        if (!purchasesRes.ok || !rateCutsRes.ok) {
          throw new Error('Failed to fetch data');
        }

        const purchases = await purchasesRes.json();
        const rateCuts = await rateCutsRes.json();

        // Group purchases by account_name + mobile
        const grouped = purchases.reduce((acc, curr) => {
            const key = `${curr.account_name}-${curr.mobile}`;
            if (!acc[key]) {
              acc[key] = {
                account_name: curr.account_name,
                mobile: curr.mobile,
                invoices: [],
                invoiceSet: new Set(),
                totalRateCut: 0,
                totalBalance: 0,
              };
            }
          
            if (!acc[key].invoiceSet.has(curr.invoice)) {
              acc[key].invoiceSet.add(curr.invoice);
          
              const matchingCuts = rateCuts.filter(rc => rc.invoice === curr.invoice);
              const totalRateCut = matchingCuts.reduce((sum, item) => sum + Number(item.rate_cut_amt || 0), 0);
              const totalBalance = matchingCuts.reduce((sum, item) => sum + Number(item.balance_amount || 0), 0);
          
              acc[key].totalRateCut += totalRateCut;
              acc[key].totalBalance += totalBalance;
          
              acc[key].invoices.push({
                ...curr,
                totalRateCut,
                totalBalance,
              });
            }
          
            return acc;
          }, {});
          

        const groupedData = Object.values(grouped).map(({ invoiceSet, ...rest }) => rest);
        groupedData.sort((a, b) => b.totalBalance - a.totalBalance);

        setData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = React.useMemo(() => [
    {
      Header: 'S No.',
      Cell: ({ row }) => row.index + 1,
    },
    {
      Header: 'Mobile',
      accessor: 'mobile',
    },
    {
      Header: 'Account Name',
      accessor: 'account_name',
    },
    {
      Header: 'Total Invoices',
      accessor: (row) => row.invoices.length,
    },
    {
      Header: 'Total Amount',
      accessor: 'totalRateCut',
    },
    {
      Header: 'Balance Amount',
      accessor: 'totalBalance',
    },
  ], []);
  

  const renderRowSubComponent = ({ row }) => (
    <div className="p-3">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Invoice No.</th>
            <th>Total Amount</th>
            <th>Balance Amount</th>
          </tr>
        </thead>
        <tbody>
          {row.original.invoices.map((inv, index) => (
            <tr key={index}>
              <td>{new Date(inv.date).toISOString().slice(0, 10).split('-').reverse().join('-')}</td>
              <td>{inv.invoice}</td>
              <td>{inv.totalRateCut}</td>
              <td>{inv.totalBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="main-container">
      <div className="payments-table-container">
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Purchase/Supllier Balance</h3>
          </Col>
        </Row>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <DataTable
            columns={columns}
            data={data}
            
            renderRowSubComponent={renderRowSubComponent}
          />
        )}
      </div>
    </div>
  );
};

export default RepairsTable;
