import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

function Card({ title, children }) {
  return (
    <BootstrapCard className="shadow-sm mb-3">
      <BootstrapCard.Body>
        <BootstrapCard.Title className="fw-bold">{title}</BootstrapCard.Title>
        <div>{children}</div>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

export default Card;
