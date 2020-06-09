package ru.bordit.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Orders.
 */
@Entity
@Table(name = "orders")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Orders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "date", nullable = false)
    private Instant date;

    @OneToMany(mappedBy = "orders")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<OrderPoint> orderpoints = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "orders", allowSetters = true)
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public Orders date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Set<OrderPoint> getOrderpoints() {
        return orderpoints;
    }

    public Orders orderpoints(Set<OrderPoint> orderPoints) {
        this.orderpoints = orderPoints;
        return this;
    }

    public Orders addOrderpoint(OrderPoint orderPoint) {
        this.orderpoints.add(orderPoint);
        orderPoint.setOrders(this);
        return this;
    }

    public Orders removeOrderpoint(OrderPoint orderPoint) {
        this.orderpoints.remove(orderPoint);
        orderPoint.setOrders(null);
        return this;
    }

    public void setOrderpoints(Set<OrderPoint> orderPoints) {
        this.orderpoints = orderPoints;
    }

    public Client getClient() {
        return client;
    }

    public Orders client(Client client) {
        this.client = client;
        return this;
    }

    public void setClient(Client client) {
        this.client = client;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Orders)) {
            return false;
        }
        return id != null && id.equals(((Orders) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Orders{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            "}";
    }
}
