package ru.bordit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import ru.bordit.web.rest.TestUtil;

public class OrderPointTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(OrderPoint.class);
        OrderPoint orderPoint1 = new OrderPoint();
        orderPoint1.setId(1L);
        OrderPoint orderPoint2 = new OrderPoint();
        orderPoint2.setId(orderPoint1.getId());
        assertThat(orderPoint1).isEqualTo(orderPoint2);
        orderPoint2.setId(2L);
        assertThat(orderPoint1).isNotEqualTo(orderPoint2);
        orderPoint1.setId(null);
        assertThat(orderPoint1).isNotEqualTo(orderPoint2);
    }
}
