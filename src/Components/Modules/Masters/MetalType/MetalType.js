import React, { useState } from 'react';
import InputField from '../../../Pages/InputField/InputField';


const MetalType = () => {

  const [formData, setFormData] = useState({
    account_name: '',
    print_name: '',
    account_group: '',
    pin_code: '',
    state: '',
    state_code: '',

  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="main-container">

      <div className="form-row">
      <InputField
        label="Customer Name:"
        name="account_name"
        value={formData.account_name}
        onChange={handleChange}
        required={true}

      />
      <InputField
        label="Print Name:"
        name="print_name"
        value={formData.print_name}
        onChange={handleChange}
        required={true}

      />
      <InputField
        label="Account Group:"
        name="account_group"
        value="Customer"
        readOnly
      />
      <InputField
        label="Pincode:"
        name="pin_code"
        value={formData.pin_code}
        onChange={handleChange}
        required={true}

      />
    </div>
    </div>

  )
}

export default MetalType
