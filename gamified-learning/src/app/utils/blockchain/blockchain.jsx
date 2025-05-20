"use client";
import React, { useState } from "react";
import crypto from "crypto";

const truncateHash = (input) => input.slice(0, 8);

const generateHash = (data) => {
  return truncateHash(
    crypto.createHash("sha256").update(data).digest("hex")
  );
};

const Block = ({ block, index, valid }) => (
  <div
    className={`p-4 rounded-2xl shadow-md m-2 w-60 transition duration-300 ${
      valid ? "bg-green-100" : "bg-red-100"
    }`}
  >
    <h2 className="font-bold text-lg">Block #{index}</h2>
    <p className="text-sm mt-2">Data: {block.data}</p>
    <p className="text-xs mt-1 text-gray-600">Hash: {block.hash}</p>
    <p className="text-xs mt-1 text-gray-600">Prev: {block.prevHash}</p>
  </div>
);

export default function BlockchainVisualizer() {
  const [chain, setChain] = useState([
    {
      data: "Genesis Block",
      prevHash: "0",
      hash: generateHash("Genesis Block0"),
    },
  ]);
  const [newData, setNewData] = useState("");
  const [validity, setValidity] = useState([]);

  const addBlock = () => {
    const prevBlock = chain[chain.length - 1];
    const newBlock = {
      data: newData || `Block ${chain.length}`,
      prevHash: prevBlock.hash,
      hash: generateHash(newData + prevBlock.hash),
    };
    setChain([...chain, newBlock]);
    setNewData("");
    setValidity([]);
  };

  const verifyChain = () => {
    const results = chain.map((block, idx) => {
      if (idx === 0) return true;
      const prev = chain[idx - 1];
      const expectedHash = generateHash(block.data + block.prevHash);
      return block.prevHash === prev.hash && block.hash === expectedHash;
    });
    setValidity(results);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧱 Blockchain Visualizer</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
          placeholder="Enter block data"
          className="p-2 border rounded w-64"
        />
        <button onClick={addBlock}>Add Block</button>
        <button onClick={verifyChain} variant="outline">
          Verify Chain
        </button>
      </div>
      <div className="flex overflow-x-auto p-2">
        {chain.map((block, idx) => (
          <Block
            key={idx}
            block={block}
            index={idx}
            valid={validity.length > 0 ? validity[idx] : true}
          />
        ))}
      </div>
    </div>
  );
}
