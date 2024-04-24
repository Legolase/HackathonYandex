import {useChatsStore} from "../store/ChatsStore";
import {useContactsStore} from "../store/ContactsStore";

const useChangeActive = () => {

    const {fetchChats} = useChatsStore()
    const {fetchContacts} = useContactsStore()

    const downloadChats = (offset = 0) => {
        fetchChats(offset)
    }
    const downloadContacts = (offset = 0) => {
        fetchContacts(offset)
    }

    return [downloadChats, downloadContacts]

}

export {useChangeActive}