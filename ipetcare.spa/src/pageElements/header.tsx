import React, { useState } from 'react'
// import {
//   Button,
//   Container,
//   Menu,
//   Input,
//   MenuItemProps,
// } from 'semantic-ui-react'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'

export const Header = () => {
  const [activeItem, setActiveItem] = useState('Główna')
  const user = useSelector((state: StoreState) => state.user)

  //   const onClick = (
  //     e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  //     { name }: MenuItemProps
  //   ) => {
  //     if (typeof name === 'string') setActiveItem(name)
  //   }

  //   return (
  //     <div className="headerContainer">
  //       <Menu>
  //         <Menu.Item
  //           name="Główna"
  //           active={activeItem === 'Główna'}
  //           onClick={onClick}
  //         />
  //         <Menu.Item
  //           name="Zwierzęta"
  //           active={activeItem === 'Zwierzęta'}
  //           onClick={onClick}
  //         />
  //         <Menu.Item
  //           name="Weterynarze"
  //           active={activeItem === 'Weterynarze'}
  //           onClick={onClick}
  //         />
  //         <Menu.Item
  //           name="Kalendarz"
  //           active={activeItem === 'Kalendarz'}
  //           onClick={onClick}
  //         />
  //         <Menu.Menu position="right">
  //           {/* <Menu.Item>
  //             <Input icon="search" placeholder="Szukaj..." />
  //           </Menu.Item> */}
  //           {user.firstName && (
  //             <Menu.Item
  //               name={user.firstName}
  //               active={activeItem === user.firstName}
  //               onClick={onClick}
  //             />
  //           )}
  //           <Menu.Item
  //             name="Wyloguj"
  //             active={activeItem === 'Wyloguj'}
  //             onClick={onClick}
  //           />
  //         </Menu.Menu>
  //       </Menu>
  //     </div>
  //   )
}
