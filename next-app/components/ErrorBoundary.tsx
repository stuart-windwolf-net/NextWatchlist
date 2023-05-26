import React, { ReactNode } from "react";

interface State {
    hasError: boolean;
}

interface Props {
    children: ReactNode;
}

class ErrorBoundary extends React.Component<Props,State> {
    constructor(props:Props) {
      super(props);
   
      // Define a state variable to track whether is an error or not
      this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
      // Update state so the next render will show the fallback UI
      return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      // You can use your own error logging service here
      console.log({ error, errorInfo });
    }
    render() {
      // Check if the error is thrown
      if (this.state.hasError) {
        this.setState({ hasError: false });
        // You can render any custom fallback UI
        return (
          <div>
            <h2>Oops, there is an error!</h2>
          </div>
        );
      }
   
      // Return children components in case of no error   
      return this.props.children;
    }
  }
   
  export default ErrorBoundary;