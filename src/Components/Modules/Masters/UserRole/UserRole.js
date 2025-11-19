import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserRole.css";
import baseURL from "../../../../Url/NodeBaseURL";

const roleHeadings = [
  "User Master",
  "Customer Master",
  "Worker Master",
  "Accounts",
  "Category Master",
  "Sub Category Master",
  "Purity",
  "Metal Type",
  "Design Master",
  "Rates",
  "Wastage Master",
  "Company Info",
  "Sales",
  "Estimate",
  "Stock",
  "Reciepts",
  "Stock Entry",
  "Repairs",
];

const UserRole = () => {
  const [permissions, setPermissions] = useState(
    roleHeadings.reduce((acc, heading) => {
      acc[heading] = {
        add: false,
        modify: false,
        delete: false,
        view: false,
        print: false,
      };
      return acc;
    }, {})
  );

  const [userType, setUserType] = useState("");
  const [userTypeId, setUserTypeId] = useState(null);
  const [userTypes, setUserTypes] = useState([]);
  const [selectAllRows, setSelectAllRows] = useState(false);
  const [isNewUserType, setIsNewUserType] = useState(false);

  // ✅ Fetch all user types on mount
  useEffect(() => {
    fetchUserTypes();
  }, []);

  const fetchUserTypes = async () => {
    try {
      const res = await axios.get(`${baseURL}/usertypes`);
      setUserTypes(res.data);
    } catch (err) {
      console.error("Error fetching user types:", err);
    }
  };

  // ✅ Handle selecting existing user type or adding new
  const handleUserTypeSelect = async (e) => {
    const value = e.target.value;

    if (value === "new") {
      setIsNewUserType(true);
      setUserType("");
      setUserTypeId(null);
      resetPermissions();
    } else if (value) {
      setIsNewUserType(false);
      const selected = userTypes.find((u) => u.id === Number(value));
      if (selected) {
        setUserType(selected.user_type);
        setUserTypeId(selected.id); // ✅ important for Update button
        await fetchPermissions(selected.id);
      }
    } else {
      resetPermissions();
    }
  };


  // ✅ Fetch permissions for selected user type
  const fetchPermissions = async (user_type_id) => {
    try {
      const res = await axios.get(`${baseURL}/permissions/${user_type_id}`);
      const fetchedPermissions = res.data.permissions;

      // Merge with defaults to ensure all menus exist
      const merged = { ...permissions };
      roleHeadings.forEach((heading) => {
        merged[heading] = fetchedPermissions[heading] || {
          add: false,
          modify: false,
          delete: false,
          view: false,
          print: false,
        };
      });
      setPermissions(merged);
    } catch (err) {
      console.error("Error fetching permissions:", err);
    }
  };

  // ✅ Reset permissions to default (for new user type)
  const resetPermissions = () => {
    const reset = roleHeadings.reduce((acc, heading) => {
      acc[heading] = {
        add: false,
        modify: false,
        delete: false,
        view: false,
        print: false,
      };
      return acc;
    }, {});
    setPermissions(reset);
  };

  // ✅ Handle individual checkbox toggle
  const handleCheckboxChange = (heading, permissionType) => {
    setPermissions((prev) => ({
      ...prev,
      [heading]: {
        ...prev[heading],
        [permissionType]: !prev[heading][permissionType],
      },
    }));
  };

  // ✅ Handle select all for a single row (menu)
  const handleRowSelectAll = (heading) => {
    const current = permissions[heading];
    const allTrue = Object.values(current).every((v) => v === true);
    const updated = Object.keys(current).reduce((acc, key) => {
      acc[key] = !allTrue;
      return acc;
    }, {});
    setPermissions((prev) => ({
      ...prev,
      [heading]: updated,
    }));
  };

  // ✅ Handle select/deselect all rows
  const handleHeaderSelectAll = () => {
    const newValue = !selectAllRows;
    const updatedPermissions = {};
    roleHeadings.forEach((heading) => {
      updatedPermissions[heading] = {
        add: newValue,
        modify: newValue,
        delete: newValue,
        view: newValue,
        print: newValue,
      };
    });
    setPermissions(updatedPermissions);
    setSelectAllRows(newValue);
  };

  // ✅ Save data to backend using Axios
  const handleSave = async () => {
    if (!userType.trim()) {
      alert("Please enter or select a user type before saving.");
      return;
    }

    try {
      const res = await axios.post(`${baseURL}/save-user-roles`, {
        user_type: userType,
        permissions,
      });
      alert(res.data.message);

      // Refetch user types
      const typesRes = await axios.get(`${baseURL}/usertypes`);
      setUserTypes(typesRes.data);

      // If existing type, restore the selection
      if (userTypeId) {
        const selected = typesRes.data.find((ut) => ut.id === userTypeId);
        if (selected) setUserType(selected.user_type);
      }
      // For new type, you can either keep it in input or reset
    } catch (err) {
      alert("Error saving permissions");
      console.error(err);
    }
  };



  return (
    <div className="userrole-container">
      <h2 className="userrole-title">User Role Permissions</h2>

      {/* 🔹 User Type Selection Field */}
      <div className="userrole-input-group">
        <label htmlFor="userType" className="userrole-label">
          User Type:
        </label>
        <select
          id="userType"
          className="userrole-select"
          value={isNewUserType ? "new" : userTypeId || ""}
          onChange={handleUserTypeSelect}
        >
          <option value="">-- Select User Type --</option>
          {userTypes.map((ut) => (
            <option key={ut.id} value={ut.id}>
              {ut.user_type}
            </option>
          ))}
          <option value="new">+ Add New User Type</option>
        </select>

        {/* If "Add New" is selected, show input field */}
        {isNewUserType && (
          <input
            type="text"
            className="userrole-input"
            placeholder="Enter new user type (e.g., Admin, Manager)"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          />
        )}
      </div>

      {/* 🔹 Permissions Table */}
      <table className="userrole-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectAllRows}
                onChange={handleHeaderSelectAll}
              />
            </th>
            <th>Menu Name</th>
            <th>Add</th>
            <th>Modify</th>
            <th>Delete</th>
            <th>View</th>
            <th>Print</th>
            <th>Select All</th>
          </tr>
        </thead>
        <tbody>
          {roleHeadings.map((heading, index) => {
            const rowAllSelected = Object.values(permissions[heading]).every((v) => v);
            return (
              <tr key={heading}>
                <td>{index + 1}</td>
                <td className="menu-name">{heading}</td>
                {["add", "modify", "delete", "view", "print"].map((perm) => (
                  <td key={perm}>
                    <input
                      type="checkbox"
                      checked={permissions[heading][perm]}
                      onChange={() => handleCheckboxChange(heading, perm)}
                    />
                  </td>
                ))}
                <td>
                  <input
                    type="checkbox"
                    checked={rowAllSelected}
                    onChange={() => handleRowSelectAll(heading)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 🔹 Footer Buttons */}
      <div className="userrole-footer">
        <button className="save-btn" onClick={handleSave}>
          {userTypeId ? "Update" : "Save"}
        </button>

        <button className="cancel-btn" onClick={resetPermissions}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UserRole;
