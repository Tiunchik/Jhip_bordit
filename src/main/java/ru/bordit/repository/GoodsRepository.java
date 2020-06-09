package ru.bordit.repository;

import ru.bordit.domain.Goods;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Goods entity.
 */
@Repository
public interface GoodsRepository extends JpaRepository<Goods, Long> {

    @Query(value = "select distinct goods from Goods goods left join fetch goods.categories",
        countQuery = "select count(distinct goods) from Goods goods")
    Page<Goods> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct goods from Goods goods left join fetch goods.categories")
    List<Goods> findAllWithEagerRelationships();

    @Query("select goods from Goods goods left join fetch goods.categories where goods.id =:id")
    Optional<Goods> findOneWithEagerRelationships(@Param("id") Long id);
}
