import React from "react";

export const Mark = ({ name, keyword }: { name: string; keyword: string }) => {
  if (!keyword) {
    return <span>{name}</span>;
  }
  const arr = name.split(`${keyword}`);
  console.log(keyword, arr);
  return (
    <>
      {arr.map((str, index) => {
        return (
          <span key={index}>
            {str}
            {index === arr.length - 1 ? null : (
              <span style={{ color: "red" }}>{keyword}</span>
            )}
          </span>
        );
      })}
    </>
  );
};
