import {ReactComponent as Chats} from "./svg/chats.svg";
import {ReactComponent as Contacts} from "./svg/contacts.svg";
import {ReactComponent as Settings} from "./svg/settings.svg";

const Icon = ({Glyph, ...props}) => {
    return (
        <Glyph {...props} />
    );
}

export const ChatsIcon = (...props) => <Icon Glyph={Chats} {...props}/>;
export const ContactsIcon = (...props) => <Icon Glyph={Contacts} {...props}/>;
export const SettingsIcon = (...props) => <Icon Glyph={Settings} {...props}/>;
