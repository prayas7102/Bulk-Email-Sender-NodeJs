import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';

export default function SetTime() {
    const [value, onChange] = useState(new Date());
    console.log(value)

    return (
        <div style={{ color: "black" }}>
            <DateTimePicker onChange={onChange} value={value} />
        </div>
    );
}