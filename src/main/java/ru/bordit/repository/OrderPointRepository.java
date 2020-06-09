package ru.bordit.repository;

import ru.bordit.domain.OrderPoint;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the OrderPoint entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrderPointRepository extends JpaRepository<OrderPoint, Long> {
}
