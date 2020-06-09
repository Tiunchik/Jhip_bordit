package ru.bordit.web.rest;

import ru.bordit.domain.OrderPoint;
import ru.bordit.repository.OrderPointRepository;
import ru.bordit.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ru.bordit.domain.OrderPoint}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OrderPointResource {

    private final Logger log = LoggerFactory.getLogger(OrderPointResource.class);

    private static final String ENTITY_NAME = "orderPoint";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrderPointRepository orderPointRepository;

    public OrderPointResource(OrderPointRepository orderPointRepository) {
        this.orderPointRepository = orderPointRepository;
    }

    /**
     * {@code POST  /order-points} : Create a new orderPoint.
     *
     * @param orderPoint the orderPoint to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new orderPoint, or with status {@code 400 (Bad Request)} if the orderPoint has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/order-points")
    public ResponseEntity<OrderPoint> createOrderPoint(@RequestBody OrderPoint orderPoint) throws URISyntaxException {
        log.debug("REST request to save OrderPoint : {}", orderPoint);
        if (orderPoint.getId() != null) {
            throw new BadRequestAlertException("A new orderPoint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        OrderPoint result = orderPointRepository.save(orderPoint);
        return ResponseEntity.created(new URI("/api/order-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /order-points} : Updates an existing orderPoint.
     *
     * @param orderPoint the orderPoint to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated orderPoint,
     * or with status {@code 400 (Bad Request)} if the orderPoint is not valid,
     * or with status {@code 500 (Internal Server Error)} if the orderPoint couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/order-points")
    public ResponseEntity<OrderPoint> updateOrderPoint(@RequestBody OrderPoint orderPoint) throws URISyntaxException {
        log.debug("REST request to update OrderPoint : {}", orderPoint);
        if (orderPoint.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        OrderPoint result = orderPointRepository.save(orderPoint);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, orderPoint.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /order-points} : get all the orderPoints.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderPoints in body.
     */
    @GetMapping("/order-points")
    public List<OrderPoint> getAllOrderPoints() {
        log.debug("REST request to get all OrderPoints");
        return orderPointRepository.findAll();
    }

    /**
     * {@code GET  /order-points/:id} : get the "id" orderPoint.
     *
     * @param id the id of the orderPoint to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the orderPoint, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/order-points/{id}")
    public ResponseEntity<OrderPoint> getOrderPoint(@PathVariable Long id) {
        log.debug("REST request to get OrderPoint : {}", id);
        Optional<OrderPoint> orderPoint = orderPointRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(orderPoint);
    }

    /**
     * {@code DELETE  /order-points/:id} : delete the "id" orderPoint.
     *
     * @param id the id of the orderPoint to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/order-points/{id}")
    public ResponseEntity<Void> deleteOrderPoint(@PathVariable Long id) {
        log.debug("REST request to delete OrderPoint : {}", id);
        orderPointRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code GET  /order-points/orders/:id} : get the orderPoint thta contains order id.
     *
     * @param id the id of the order to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of orderPoints in body.
     */
    @GetMapping("/order-points/orders/{id}")
    public List<OrderPoint> getOrderPointByOrders(@PathVariable Long id) {
        log.debug("REST request to get OrderPoint by Order Id : {}", id);
        return orderPointRepository.findAllByOrders_Id(id);

    }
}
