import React, { useEffect, useState } from "react";
import styled from "styled-components";

function FeaturesSelector({ onChange = () => {}, onSubmit }) {
  const [features, setFeatures] = useState([]);
  const [inputKeyValue, setInputKeyValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const addFeature = () => {
    if (inputKeyValue.length === 0) {
      alert(`Enter key`);
      return;
    } else if (inputKeyValue.length !== 0 && inputValue.length === 0) {
      alert(`Enter value for key ${inputKeyValue}`);
      return;
    }

    setFeatures((features) => [
      { key: inputKeyValue, value: inputValue },
      ...features,
    ]);
    setInputKeyValue("");
    setInputValue("");
  };

  const removeFeature = (index) => {
    setFeatures((features) =>
      features.filter((feature, _index) => _index !== index)
    );
  };

  useEffect(() => {
    onChange(features);
  }, [features]);

  return (
    <FeaturesSelectorStyle>
      <div className="labels">
        <div className="row">
          <div className="label">For User</div>
          <input id="form1-user-name" />
        </div>
        <div className="row">
          <div className="label" id="form1-doc-name">
            Document Name
          </div>
          <input />
        </div>
      </div>
      <div className="label">Enter Document Values</div>
      <div className="input-wrapper">
        <img src={`${process.env.PUBLIC_URL}/images/icons/note.svg`} />
        <input
          value={inputKeyValue}
          onChange={(e) =>
            inputKeyValue.length < 60 && setInputKeyValue(e.target.value)
          }
        />
        <input
          value={inputValue}
          onChange={(e) =>
            inputValue.length < 60 && setInputValue(e.target.value)
          }
        />
        <div className="btn" onClick={addFeature}>
          Add
        </div>
      </div>
      <div className="features">
        {features.map((feature, index) => (
          <div className="feature">
            <div className="texts">
              <label className="text">{feature.key}</label>
              <label className="text value">{feature.value}</label>
            </div>
            <div className="close" onClick={() => removeFeature(index)}>
              X
            </div>
          </div>
        ))}
      </div>
      <div
        className="btn submit"
        onClick={() =>
          onSubmit({
            username: document.getElementById("form1-user-name").value,
            documentName: document.getElementById("form1-doc-name").value,
            values: features,
          })
        }
      >
        Submit
      </div>
    </FeaturesSelectorStyle>
  );
}

export default FeaturesSelector;

export const FeaturesSelectorStyle = styled.div`
  .label {
    margin: 1rem 0;
  }
  .labels {
    .row {
      margin: 1rem 0;
      max-width: 400px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      input {
        font-size: 1rem;
      }
    }
  }
  .input-wrapper {
    display: flex;
    img {
      margin: 0 0.4rem;
    }
    .btn {
      margin-left: 1rem;
      transform: scale(0.7);
      line-height: 26px;
    }
    input {
      margin-right: 1rem;
    }
  }
  .features {
    padding: 1rem 0rem;
    max-width: 500px;
    margin: 0 2rem;
  }
  .feature {
    display: flex;

    align-items: center;
    justify-content: space-between;
    /* border: 1px solid rgba(0, 0, 0, 0.4); */
    margin: 0.5rem 0;
    padding: 0.1rem;
    border-radius: 5px;
    background-color: white;

    .texts {
      width: 100%;
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    .text {
      border-radius: 5px;
      width: fit-content;
      border: 2px solid tomato;
      margin: 1rem;
      padding: 3px 5px;
    }

    .value {
      border: 2px solid navy;
    }
    .close {
      color: tomato;
      font-weight: 400;
      transform: scaleY(0.8);
      padding: 0.2rem;
      cursor: pointer;
    }
  }

  .submit {
    margin: 1rem 0;
  }
`;