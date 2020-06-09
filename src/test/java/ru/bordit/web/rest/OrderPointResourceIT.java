package ru.bordit.web.rest;

import ru.bordit.BorditApp;
import ru.bordit.domain.OrderPoint;
import ru.bordit.repository.OrderPointRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OrderPointResource} REST controller.
 */
@SpringBootTest(classes = BorditApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OrderPointResourceIT {

    private static final Integer DEFAULT_NUMBER = 1;
    private static final Integer UPDATED_NUMBER = 2;

    @Autowired
    private OrderPointRepository orderPointRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOrderPointMockMvc;

    private OrderPoint orderPoint;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderPoint createEntity(EntityManager em) {
        OrderPoint orderPoint = new OrderPoint()
            .number(DEFAULT_NUMBER);
        return orderPoint;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static OrderPoint createUpdatedEntity(EntityManager em) {
        OrderPoint orderPoint = new OrderPoint()
            .number(UPDATED_NUMBER);
        return orderPoint;
    }

    @BeforeEach
    public void initTest() {
        orderPoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrderPoint() throws Exception {
        int databaseSizeBeforeCreate = orderPointRepository.findAll().size();
        // Create the OrderPoint
        restOrderPointMockMvc.perform(post("/api/order-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderPoint)))
            .andExpect(status().isCreated());

        // Validate the OrderPoint in the database
        List<OrderPoint> orderPointList = orderPointRepository.findAll();
        assertThat(orderPointList).hasSize(databaseSizeBeforeCreate + 1);
        OrderPoint testOrderPoint = orderPointList.get(orderPointList.size() - 1);
        assertThat(testOrderPoint.getNumber()).isEqualTo(DEFAULT_NUMBER);
    }

    @Test
    @Transactional
    public void createOrderPointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = orderPointRepository.findAll().size();

        // Create the OrderPoint with an existing ID
        orderPoint.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrderPointMockMvc.perform(post("/api/order-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderPoint)))
            .andExpect(status().isBadRequest());

        // Validate the OrderPoint in the database
        List<OrderPoint> orderPointList = orderPointRepository.findAll();
        assertThat(orderPointList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOrderPoints() throws Exception {
        // Initialize the database
        orderPointRepository.saveAndFlush(orderPoint);

        // Get all the orderPointList
        restOrderPointMockMvc.perform(get("/api/order-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(orderPoint.getId().intValue())))
            .andExpect(jsonPath("$.[*].number").value(hasItem(DEFAULT_NUMBER)));
    }
    
    @Test
    @Transactional
    public void getOrderPoint() throws Exception {
        // Initialize the database
        orderPointRepository.saveAndFlush(orderPoint);

        // Get the orderPoint
        restOrderPointMockMvc.perform(get("/api/order-points/{id}", orderPoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(orderPoint.getId().intValue()))
            .andExpect(jsonPath("$.number").value(DEFAULT_NUMBER));
    }
    @Test
    @Transactional
    public void getNonExistingOrderPoint() throws Exception {
        // Get the orderPoint
        restOrderPointMockMvc.perform(get("/api/order-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrderPoint() throws Exception {
        // Initialize the database
        orderPointRepository.saveAndFlush(orderPoint);

        int databaseSizeBeforeUpdate = orderPointRepository.findAll().size();

        // Update the orderPoint
        OrderPoint updatedOrderPoint = orderPointRepository.findById(orderPoint.getId()).get();
        // Disconnect from session so that the updates on updatedOrderPoint are not directly saved in db
        em.detach(updatedOrderPoint);
        updatedOrderPoint
            .number(UPDATED_NUMBER);

        restOrderPointMockMvc.perform(put("/api/order-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrderPoint)))
            .andExpect(status().isOk());

        // Validate the OrderPoint in the database
        List<OrderPoint> orderPointList = orderPointRepository.findAll();
        assertThat(orderPointList).hasSize(databaseSizeBeforeUpdate);
        OrderPoint testOrderPoint = orderPointList.get(orderPointList.size() - 1);
        assertThat(testOrderPoint.getNumber()).isEqualTo(UPDATED_NUMBER);
    }

    @Test
    @Transactional
    public void updateNonExistingOrderPoint() throws Exception {
        int databaseSizeBeforeUpdate = orderPointRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrderPointMockMvc.perform(put("/api/order-points").with(csrf())
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(orderPoint)))
            .andExpect(status().isBadRequest());

        // Validate the OrderPoint in the database
        List<OrderPoint> orderPointList = orderPointRepository.findAll();
        assertThat(orderPointList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrderPoint() throws Exception {
        // Initialize the database
        orderPointRepository.saveAndFlush(orderPoint);

        int databaseSizeBeforeDelete = orderPointRepository.findAll().size();

        // Delete the orderPoint
        restOrderPointMockMvc.perform(delete("/api/order-points/{id}", orderPoint.getId()).with(csrf())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<OrderPoint> orderPointList = orderPointRepository.findAll();
        assertThat(orderPointList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
