import { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export function TabProvider({ children }) {
    const [activeTab, setActiveTab] = useState("mes-statistiques");
    const [pendingCreateBordereauForUser, setPendingCreateBordereauForUser] = useState(null);
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab, pendingCreateBordereauForUser, setPendingCreateBordereauForUser }}>
            { children }
        </TabContext.Provider>
    );
}

export function useTab() {
    return useContext(TabContext);
}