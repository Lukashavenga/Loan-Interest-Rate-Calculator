import * as React from "react";
import LoanCalculator from "../components/loanCalculator/loanCalculator";
import "@fontsource/roboto/500.css";
import "./index.scss";

// markup
const IndexPage = () => {
  return (
    <div className="main">
      <LoanCalculator/>
    </div>
  )
}

export default IndexPage;
