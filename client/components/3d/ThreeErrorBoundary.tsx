import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ThreeErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('3D Component Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <div className="text-center text-gray-500">
            <p>3D visualization unavailable</p>
            <p className="text-sm">Fallback to 2D view</p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ThreeErrorBoundary;
