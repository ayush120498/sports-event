import React, { ComponentType } from "react";
import './styles.scss';
import Header from "@Components/Header";

const withLayout = <T extends JSX.IntrinsicAttributes>(
  WrappedComponent: ComponentType<T>
): React.FC<T> => {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLayout: React.FC<T> = (props) => (
    <div className="container">
      <Header />
      <div className="container__child">
        <WrappedComponent {...props} />
      </div>
    </div>
  );

  ComponentWithLayout.displayName = `withLayout(${displayName})`;

  return ComponentWithLayout;
};




export default withLayout;
