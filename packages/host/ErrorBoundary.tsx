// import React, { Component, ReactNode, ErrorInfo } from 'react';

// interface ErrorBoundaryProps {
//   children: ReactNode;
//   fallback?: ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
//   error?: Error;
// }

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   state: ErrorBoundaryState = { hasError: false };

//   static getDerivedStateFromError(error: Error): ErrorBoundaryState {
//     // Update state so next render shows fallback UI
//     return { hasError: true, error };
//   }

//   componentDidCatch(error: Error, info: ErrorInfo) {
//     // Log error info to an error reporting service if needed
//     console.error('ErrorBoundary caught an error:', error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Render fallback UI or custom error message
//       return this.props.fallback || <h2>Something went wrong.</h2>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
