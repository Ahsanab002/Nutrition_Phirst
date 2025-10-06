import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: any };

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    // Log to console; replace with remote logging if needed
    console.error('Uncaught error in component tree:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-50 border border-red-200 rounded">
          <h2 className="text-lg font-semibold text-red-700">Something went wrong</h2>
          <p className="mt-2 text-sm text-red-600">An error occurred while rendering this section.</p>
          <details className="mt-2 text-xs text-red-500 whitespace-pre-wrap">
            {String(this.state.error)}
          </details>
          <div className="mt-4">
            <button className="px-3 py-1 bg-gray-100 rounded" onClick={this.handleReset}>Try again</button>
          </div>
        </div>
      );
    }

    return this.props.children as JSX.Element;
  }
}

export default ErrorBoundary;
