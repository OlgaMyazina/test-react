import React from "react";

export default class Subscrible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSend: false,
      gender: "both",
    }
  }

  handlerGender = (event) => {
    this.setState({
      gender: event.target.value,
    });
  };


  handlerForm = (event) => {
    event.preventDefault();
    const formField = [], formElement = event.target;
    Array.from(formElement).forEach(element => {
      if (!element) return;
      if (!element.name) return;
      if ((element.type === 'radio') && (!element.checked)) {
        return;
      }
      formField[element.name] = element.value;
    });

    this.setState({
      isSend: true,
    });
    console.log(formField);
    //данные для отправки:
    //console.log(JSON.stringify(formField));
  };


  isDisplay = (component) => {
    if (component === "form") {
      return this.state.isSend ? {display: "none"} : {display: "inherit"};
    }

    return this.state.isSend ? {display: "inherit"} : {display: "none"};
  };

  render() {
    return (

      <>
        <div className="subscribe__wrapper">
          <h2 className="subscribe__title">подписаться на рассылку выгодных предложений</h2>
          <p style={this.isDisplay()}>
            Подписка оформлена! Спасибо!
          </p>
          <form className="subscribe__radios" onSubmit={this.handlerForm} style={this.isDisplay("form")}>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="women"
                     onChange={this.handlerGender} checked={this.state.gender === "women"}/>
              <div className="subscribe__radio_text">Женское</div>
            </label>
            <label className=" subscribe__radio_label">
              <input className=" subscribe__radio" type="radio" name="subscribe" value="men"
                     onChange={this.handlerGender} checked={this.state.gender === "men"}/>
              <div className="subscribe__radio_text">Мужское</div>
            </label>
            <label className="subscribe__radio_label">
              <input className="subscribe__radio" type="radio" name="subscribe" value="both"
                     onChange={this.handlerGender} checked={this.state.gender === "both"}/>
              <div className="subscribe__radio_text">Всё</div>
            </label>
            <input className="subscribe__email" name="email" type="email" placeholder="Ваш e-mail"/>
            <input className="subscribe__submit" type="submit" defaultValue="ПОДПИСАТЬСЯ"/>
          </form>

        </div>
      </>
    )
  }
};
