"use client";

import { Dispatch, MouseEvent, SetStateAction, useEffect, useState, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { Replay, Delete, Add, ArrowDropDown } from "@mui/icons-material";
import styles from "./styles.module.scss";
import { ChartListItem } from "@/models/ChartListItem";
import { Card } from "shared/index";

type ChartOrderSelectorProps = {
  defaultItems: ChartListItem[];
  setOrder: Dispatch<SetStateAction<ChartListItem[]>>;
};

const STORAGE_KEY = "chart_order";

// Função para inicializar o estado a partir do localStorage
const getInitialState = (defaultItems: ChartListItem[]): { active: ChartListItem[]; inactive: ChartListItem[] } => {
  // Garante que o código só rode no client-side
  if (typeof window === "undefined") {
    return { active: defaultItems, inactive: [] };
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Validação para garantir que os dados salvos são válidos
      if (Array.isArray(parsed.active) && Array.isArray(parsed.inactive)) {
        return {
          active: parsed.active.length > 0 ? parsed.active : defaultItems,
          inactive: parsed.inactive,
        };
      }
    } catch (error) {
      console.error("Failed to parse chart order from localStorage", error);
    }
  }
  return { active: defaultItems, inactive: [] };
};


const ChartOrderSelector = ({ defaultItems, setOrder }: ChartOrderSelectorProps) => {
  // 1. Inicialização de estado otimizada
  const [items, setItems] = useState(() => getInitialState(defaultItems));
  
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // 2. Sincroniza o estado com o localStorage em um único useEffect
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Sincroniza com o componente pai na montagem inicial e quando `defaultItems` muda
  useEffect(() => {
    setOrder(items.active);
  }, [items.active, setOrder]);


  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(items.active);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    
    setItems(prev => ({ ...prev, active: reordered }));
    // 3. Chamada direta ao setOrder
    setOrder(reordered);
  }, [items.active, setOrder]);

  const handleRemove = useCallback((itemToRemove: ChartListItem) => {
    const newActive = items.active.filter((i) => i.id !== itemToRemove.id);
    const newInactive = [...items.inactive, itemToRemove];

    setItems({ active: newActive, inactive: newInactive });
    // 3. Chamada direta ao setOrder
    setOrder(newActive);
  }, [items, setOrder]);

  const handleAdd = useCallback((itemToAdd: ChartListItem) => {
    const newInactive = items.inactive.filter((i) => i.id !== itemToAdd.id);
    const newActive = [...items.active, itemToAdd];
    
    setItems({ active: newActive, inactive: newInactive });
    // 3. Chamada direta ao setOrder
    setOrder(newActive);
  }, [items, setOrder]);

  const handleReset = useCallback(() => {
    setItems({ active: defaultItems, inactive: [] });
    // 3. Chamada direta ao setOrder
    setOrder(defaultItems);
    localStorage.removeItem(STORAGE_KEY);
  }, [defaultItems, setOrder]);

  const handleOpen = (event: MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.container}>
      <Card title="Customizar Dashboard" action={handleReset} actionIcon={(<Replay/>)}>
        <Card color="secondary">
          <div className={styles.innerCard} onClick={handleOpen}>
            Alterar Ordem
            <ArrowDropDown />
          </div>
        </Card>
      </Card>


      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { minWidth: "30%", padding: "16px" },
        }}
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="active">
            {(provided) => (
              <div
                className={styles.list}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h4>Gráficos em Tela</h4>
                {items.active.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={String(item.id)}
                    index={index}
                  >
                    {(prov) => (
                      <MenuItem
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className={styles.item}
                        // Previne o fechamento do menu ao clicar para arrastar
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className={styles.listItem}>  
                          <span>{item.label}</span>
                          <IconButton
                            size="small"
                            onClick={() => handleRemove(item)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </div>
                      </MenuItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {items.inactive.length > 0 && (
          <div>
            <Divider sx={{ my: 1 }} />
            <div className={styles.list}>
              <h4>Gráficos Disponíveis</h4>
              {items.inactive.map((item) => (
                <MenuItem
                  key={item.id}
                  className={styles.itemInactive}
                  onClick={() => handleAdd(item)}
                >
                  <span>{item.label}</span>
                  <IconButton size="small">
                    <Add fontSize="small" />
                  </IconButton>
                </MenuItem>
              ))}
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
};

export default ChartOrderSelector;