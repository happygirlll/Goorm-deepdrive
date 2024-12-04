// rfc : 리액트 기능 컴포넌트의 약자 <- 입력하기
import React from 'react'

export default function Form({ handleSubmit, value, setValue }) {
    console.log("Form Component");
    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <form onSubmit={handleSubmit} style={{ display: "flex " }}>
            <input
                type="text"
                name="value"
                className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
                placeholder="해야 할 일을 입력하세요."
                value={value}
                onChange={handleChange}
            />
            <input type="submit" value="입력"
                className="p-2 text-blue-400 rounded
                    hover:text-white hover:bg-blue-200"
            />
        </form>

    );
}
