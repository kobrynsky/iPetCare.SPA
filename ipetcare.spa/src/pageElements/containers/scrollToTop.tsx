import { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

class ScrollToTop extends Component<RouteComponentProps<any, any, any>, any> {
    componentDidMount = () => window.scrollTo(0, 0);

    componentDidUpdate = (prevProps: any) => {
        if (this.props.location !== prevProps.location) window.scrollTo(0, 0);
    };

    render = () => this.props.children;
}

export default withRouter(ScrollToTop);