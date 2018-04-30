import React from 'react';

const viewWithWillFocus = ComponetToWrap => {
  return class extends React.Component {
    componentDidMount() {
    }

    render() {
      return <ComponetToWrap { ...this.props } />;
    }
  }
}

export default viewWithWillFocus;
