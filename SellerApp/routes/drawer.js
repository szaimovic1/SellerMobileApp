import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import HomeStack from './homeStack';
import LoginStack from './loginStack';
import OrderStack from './orderStack';

const RootDrawerNavigator = createDrawerNavigator({
    LogOut: {
        screen: LoginStack,
        navigationOptions: () => ( { title: 'Log out' } )
    },
    Products: {
        screen: HomeStack,
    },
    Orders: {
        screen: OrderStack,
    },
});

export default createAppContainer(RootDrawerNavigator);