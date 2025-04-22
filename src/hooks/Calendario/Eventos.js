import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";
import { db } from '../FireBase/firebaseconfig.js';

export const eventos = [
  {
    id: 1,
    title: 'Primeiro evento fisico',
    start: new Date(2025, 3, 1, 10, 0),
    end: new Date(2025, 3, 1, 24, 0),
    color: '#ae00ff',
    type: 'evento teste',
    important: "teste",
    desc: 'Primeiro calendário teste no (código react)',
  },
  {
    id: 2,
    title: 'Feira do Empreendedor',
    start: new Date(2025, 4, 10, 10, 0),
    end: new Date(2025, 4, 10, 24, 0),
    color: 'orange',
    type: 'Entrega do Projeto',
    important: "urgente",
    desc: 'Feira do Empreendedor, apresentação do Calendário',
  },
];

// Função para buscar eventos do Firestore e adicionar eventos locais
export const fetchEventos = async () => {
  try {
    const eventosRef = collection(db, "eventos");
    const snapshot = await getDocs(eventosRef);

    const eventosFirestore = [];
    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();

      eventosFirestore.push({
        id: docSnap.id,
        title: data.title,
        start: new Date(data.start),
        end: new Date(data.end),
        color: data.color,
        type: data.type,
        important: data.important,
        desc: data.desc,
      });
    });

    return [...eventos, ...eventosFirestore];
  } catch (error) {
    console.error("Erro ao buscar eventos do Firestore:", error);
    return eventos;
  }
};

// Função para adicionar evento no Firestore
export const addEvento = async (evento) => {
  try {
    const eventosRef = collection(db, "eventos");
    const docRef = await addDoc(eventosRef, evento);
    return { id: docRef.id, ...evento }; // Retorna evento com o ID do Firestore
  } catch (error) {
    console.error("Erro ao adicionar evento:", error);
  }
};

// Função para editar evento no Firestore
export const updateEvento = async (id, eventoAtualizado) => {
  try {
    const eventoRef = doc(db, "eventos", id);
    await updateDoc(eventoRef, eventoAtualizado);
  } catch (error) {
    console.error("Erro ao editar evento:", error);
  }
};

// Função para excluir evento no Firestore
export const deleteEvento = async (id) => {
  try {
    const eventoRef = doc(db, "eventos", id);
    await deleteDoc(eventoRef);
  }catch (error) {
    console.error("Erro ao excluir evento:", error);
  }
};