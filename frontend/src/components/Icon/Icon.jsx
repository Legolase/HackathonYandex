import {ReactComponent as Chats} from "./svg/chats.svg";
import {ReactComponent as Contacts} from "./svg/contacts.svg";
import {ReactComponent as Settings} from "./svg/settings.svg";
import {ReactComponent as Create} from "./svg/create.svg";
import {ReactComponent as Logo} from "./svg/logo.svg";
import {ReactComponent as Photo} from "./svg/photo.svg";
import {ReactComponent as Lang} from "./svg/language.svg";
import {ReactComponent as Notify} from "./svg/notification.svg";
import {ReactComponent as Appearance} from "./svg/appearance.svg";
import {ReactComponent as AddUser} from "./svg/addUser.svg";
import {ReactComponent as Back} from "./svg/back.svg";
import {ReactComponent as Dots} from "./svg/dots.svg";
import {ReactComponent as Edit} from "./svg/edit.svg";

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

export const PhotoIcon = (...props) => <Icon Glyph={Photo} {...props}/>;
export const LangIcon = (...props) => <Icon Glyph={Lang} {...props}/>;
export const NotifyIcon = (...props) => <Icon Glyph={Notify} {...props}/>;
export const AppearanceIcon = (...props) => <Icon Glyph={Appearance} {...props}/>;

export const AddUserIcon = (...props) => <Icon Glyph={AddUser} {...props}/>;

export const BackIcon = ({...props}) => <Icon Glyph={Back} {...props}/>;
export const DotsIcon = ({...props}) => <Icon Glyph={Dots} {...props}/>;
export const EditIcon = ({...props}) => <Icon Glyph={Edit} {...props}/>;
