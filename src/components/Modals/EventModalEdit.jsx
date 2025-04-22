const handleUpdate = async () => {
    const updatedEvent = {
        ...event,
        title,
        type,
        desc,
        start: new Date(start),
        end: new Date(end),
        important,
        color,
    };

    try {
        const docRef = doc(db, "eventos", event.id);
        await updateDoc(docRef, { ...updatedEvent });

        if (onUpdateEvento) {
            onUpdateEvento(updatedEvent); // atualiza o estado local
        }

        onClose(); // fecha o modal
    } catch (error) {
        console.error("Erro ao atualizar evento:", error);
    }
};