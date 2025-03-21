import React from 'react';
import RegistrationCard from "../../components/RegistrationCard.jsx";

const SignupPage = () => {
  return (
    <div className="container-fluid">
      <div className="row justify-content-center py-5">
        <div className="col-12 col-md-8 col-xxl-6">
          <RegistrationCard />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;