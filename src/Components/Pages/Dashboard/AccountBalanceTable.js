import React, { useState, useEffect } from 'react';

const AccountBalanceTable = () => {
  const [accountData, setAccountData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/get-unique-repair-details');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Process the data to combine duplicates and sum balances
        const processedData = processAccountData(data);
        setAccountData(processedData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processAccountData = (data) => {
    const accountMap = new Map();
    
    data.forEach(item => {
      const accountName = item.account_name;
      const balanceAmount = parseFloat(item.bal_amt) || 0;
      
      if (accountMap.has(accountName)) {
        // If account exists, add to its balance
        const existing = accountMap.get(accountName);
        accountMap.set(accountName, {
          ...existing,
          balanceAmount: existing.balanceAmount + balanceAmount
        });
      } else {
        // If new account, add to map
        accountMap.set(accountName, {
          accountName,
          balanceAmount
        });
      }
    });
    
    // Convert map values to array and sort by account name
    return Array.from(accountMap.values()).sort((a, b) => 
      a.accountName.localeCompare(b.accountName)
    );
  };

  if (loading) {
    return <div style={{ padding: '10px', textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ padding: '10px', color: 'red', textAlign: 'center' }}>Error: {error}</div>;
  }

  return (
    <div style={{ 
      height: '180px',
      overflowY: 'auto',
      width: '100%',
      marginTop: '8px'
    }}>
      <table style={{ 
        width: '100%',
        borderCollapse: 'collapse',
        fontSize: '13px'
      }}>
        <thead>
          <tr style={{ 
            backgroundColor: '#f5f5f5',
            position: 'sticky',
            top: 0
          }}>
            <th style={{ 
              padding: '6px 10px', 
              textAlign: 'left', 
              borderBottom: '1px solid #ddd',
              fontWeight: '600', color:"#b77318"
            }}>Account Name</th>
            <th style={{ 
              padding: '6px 10px', 
              textAlign: 'right', 
              borderBottom: '1px solid #ddd',
              fontWeight: '600', color:"#b77318"
            }}>Balance Amount</th>
          </tr>
        </thead>
        <tbody>
          {accountData.map((account, index) => (
            <tr key={index} style={{ 
              borderBottom: '1px solid #eee',
              ':hover': { backgroundColor: '#f9f9f9' }
            }}>
              <td style={{ 
                padding: '6px 10px', 
                textAlign: 'left',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '120px'
              }}>{account.accountName}</td>
              <td style={{ 
                padding: '6px 10px', 
                textAlign: 'right',
                color: account.balanceAmount < 0 ? '#d32f2f' : '#388e3c',
                fontWeight: '500'
              }}>
                {account.balanceAmount.toLocaleString('en-IN', { 
                  style: 'currency', 
                  currency: 'INR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountBalanceTable;