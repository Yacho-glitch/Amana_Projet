import { createContext, useContext, useState } from 'react';

const TabContext = createContext();

export function TabProvider({ children }) {
    const [activeTab, setActiveTab] = useState("mes-statistiques");
    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            { children }
        </TabContext.Provider>
    );
}

export function useTab() {
    return useContext(TabContext);
}