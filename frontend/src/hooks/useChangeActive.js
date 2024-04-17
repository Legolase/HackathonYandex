import {useChatsStore} from "../store/ChatsStore";
import {useContactsStore} from "../store/ContactsStore";

const useChangeActive = () => {

    const {setChats, fetchChats} = useChatsStore()
    const {setContacts, fetchContacts} = useContactsStore()

    const downloadChats = (offset = 0) => {
        fetchChats(offset)
        // todo: Remove Set
        setChats()
    }
    const downloadContacts = (offset = 0) => {
        fetchContacts(offset)
        // todo: Remove Set
        setContacts()
    }

    return [downloadChats, downloadContacts]

}

export {useChangeActive}