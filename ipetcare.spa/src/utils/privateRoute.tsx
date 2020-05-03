import React from 'react'
import { RouteProps, RouteComponentProps, Route, Redirect } from 'react-router'
import { useSelector } from 'react-redux'
import { RootState } from '../state/store'

interface IProps extends RouteProps {
  component: React.ComponentType<RouteComponentProps<any>>
  requiredRole?: string[]
}

const PrivateRoute: React.FC<IProps> = ({
  component: Component,
  requiredRole,
  ...rest
}) => {
  const currentUser = useSelector((state: RootState) => state.user.user)

  if (requiredRole !== undefined) {
    if (currentUser) {
      return (
        <Route
          {...rest}
          render={props =>
            requiredRole.some(r => currentUser!.role.includes(r)) ? (
              <Component {...props} />
            ) : (
              <Redirect to={'/'} />
            )
          }
        />
      )
    } else {
      return <Redirect to={'/'} />
    }
  } else {
    return (
      <Route
        {...rest}
        render={props =>
          currentUser ? <Component {...props} /> : <Redirect to={'/'} />
        }
      />
    )
  }
}

export default PrivateRoute
