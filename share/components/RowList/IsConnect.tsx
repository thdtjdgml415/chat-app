import React from "react";

function IsConnectFc({ isConnected }: { isConnected: boolean }) {
  return (
    <>
      {isConnected ? (
        <span className="w-2 h-2 mr-5 bg-green-500 rounded-lg"></span>
      ) : (
        <span className="w-2 h-2 mr-5 bg-red-500 rounded-lg"></span>
      )}
    </>
  );
}
export default IsConnectFc;
