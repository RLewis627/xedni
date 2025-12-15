"use client";

import {Landing, LoadPortfolio} from '@/components/Dumb/welcome-page';
import {Component} from 'react';

interface HomePageState {
  formInput: boolean;
}

export default class HomePage extends Component<any, HomePageState> {
  constructor(props: any){
    super(props);
    this.state = {formInput: false,};
  }

  handleClick = () => {
    this.setState((prevState) => ({formInput: !prevState.formInput}));
  };

  renderComponent = () => {
    switch (this.state.formInput) {
      case true:
        return <LoadPortfolio onClick={this.handleClick} />;
      default:
        return <Landing onClick={this.handleClick} />;
    }
  };

  render() {
    return (this.renderComponent());
  }
}
