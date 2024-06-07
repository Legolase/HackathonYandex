import {ReactComponent as Chats} from "./svg/chats.svg";
import {ReactComponent as Contacts} from "./svg/contacts.svg";
import {ReactComponent as Settings} from "./svg/settings.svg";
import {ReactComponent as Create} from "./svg/create.svg";
import {ReactComponent as Logo} from "./svg/logo.svg";

const Icon = ({Glyph, ...props}) => {
    return (
        <Glyph {...props} />
    );
}

export const ChatsIcon = (...props) => <Icon Glyph={Chats} {...props}/>;
export const ContactsIcon = (...props) => <Icon Glyph={Contacts} {...props}/>;
export const SettingsIcon = (...props) => <Icon Glyph={Settings} {...props}/>;
export const CreateIcon = (...props) => <Icon Glyph={Create} {...props}/>;
export const LogoIcon = (...props) => <Icon Glyph={Logo} {...props}/>;
