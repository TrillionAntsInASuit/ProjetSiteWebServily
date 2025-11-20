frontend/src/components/Employeur/subscribe/Subscribe.jsx [95:106]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    alert("Error: " + error.message);
  }
};
  return (
    <div className="subscribe">
      <h1>Subscribe</h1>
      <div className="subscribe-box">
        <h2>{plans[0].name}</h2>
        <p className="price">{plans[0].price}</p>
        <p className="price-period">per month</p>
        <button onClick={() => handleSubscribe(plans[0].priceId)}>
          Subscribe Now
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



frontend/src/components/User/subscribe/Subscribe.jsx [60:72]:
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="subscribe">
      <h1>Subscribe</h1>
      <div className="subscribe-box">
        <h2>{plans[0].name}</h2>
        <p className="price">{plans[0].price}</p>
        <p className="price-period">per month</p>
        <button onClick={() => handleSubscribe(plans[0].priceId)}>
          Subscribe Now
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -



