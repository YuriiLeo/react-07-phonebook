export const selectContacts = state => state.contacts;
// export const selectIsLoading = state => state.contacts.isLoading;
// export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter;
export const selectFilterdContacts = ({ contacts, filter }) => {
  
           if (!filter) {
            return contacts.items;  
         }  
        const normalizedFilter = filter.toLocaleLowerCase();
        const filterdContacts = contacts.items.filter(({name, phone}) => {
        const normalizedName = name.toLocaleLowerCase();
        const normalizedNumber = phone.toLocaleLowerCase();
        const result = normalizedName.includes(normalizedFilter) || normalizedNumber.includes(normalizedFilter);
            return result;
        }) 
       
        return filterdContacts;
    }