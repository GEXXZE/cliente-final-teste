import { FaTrash, FaPen } from "react-icons/fa";
import styles from "./style.module.css";
import { clientes } from "@/data/clientes";

interface CardProps {
  selectedDay: number; 
}

export function Card({ selectedDay }: CardProps) {
  const filteredPatients = clientes.filter((c) => c.day === selectedDay);

  return (
    <div className={styles.container}>
      <div className={styles.listSection}>
        <div className={styles.listHeader}>
          <span>cliente</span>
          <span>Serviço</span>
          <span>Horário</span>
          <span>Status</span>
          <span>Alterar</span>
        </div>

        {filteredPatients.length > 0 ? (
          filteredPatients.map((c) => (
            <div key={c.id} className={styles.listItem}>
              <div className={styles.patient}>
                <span className={`${styles.statusDot} ${styles[c.color]}`}></span>
                {c.name}
              </div>
              <div>{c.service}</div>
              <div>{c.time}</div>
              <div>{c.status}</div>
              <div className={styles.actions}>
                <button className={styles.edit}>
                  <FaPen />
                </button>
                <button className={styles.delete}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: "10px", fontStyle: "italic", color: "#555" }}>
            Nenhum cliente agendado para este dia.
          </div>
        )}
      </div>
    </div>
  );
}