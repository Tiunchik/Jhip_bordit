package ru.bordit.web.rest;

import ru.bordit.domain.Goods;
import ru.bordit.repository.GoodsRepository;
import ru.bordit.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link ru.bordit.domain.Goods}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class GoodsResource {

    private final Logger log = LoggerFactory.getLogger(GoodsResource.class);

    private static final String ENTITY_NAME = "goods";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final GoodsRepository goodsRepository;

    public GoodsResource(GoodsRepository goodsRepository) {
        this.goodsRepository = goodsRepository;
    }

    /**
     * {@code POST  /goods} : Create a new goods.
     *
     * @param goods the goods to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new goods, or with status {@code 400 (Bad Request)} if the goods has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/goods")
    public ResponseEntity<Goods> createGoods(@Valid @RequestBody Goods goods) throws URISyntaxException {
        log.debug("REST request to save Goods : {}", goods);
        if (goods.getId() != null) {
            throw new BadRequestAlertException("A new goods cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Goods result = goodsRepository.save(goods);
        return ResponseEntity.created(new URI("/api/goods/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /goods} : Updates an existing goods.
     *
     * @param goods the goods to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated goods,
     * or with status {@code 400 (Bad Request)} if the goods is not valid,
     * or with status {@code 500 (Internal Server Error)} if the goods couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/goods")
    public ResponseEntity<Goods> updateGoods(@Valid @RequestBody Goods goods) throws URISyntaxException {
        log.debug("REST request to update Goods : {}", goods);
        if (goods.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Goods result = goodsRepository.save(goods);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, goods.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /goods} : get all the goods.
     *
     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of goods in body.
     */
    @GetMapping("/goods")
    public ResponseEntity<List<Goods>> getAllGoods(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Goods");
        Page<Goods> page;
        if (eagerload) {
            page = goodsRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = goodsRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /goods/:id} : get the "id" goods.
     *
     * @param id the id of the goods to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the goods, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/goods/{id}")
    public ResponseEntity<Goods> getGoods(@PathVariable Long id) {
        log.debug("REST request to get Goods : {}", id);
        Optional<Goods> goods = goodsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(goods);
    }

    /**
     * {@code DELETE  /goods/:id} : delete the "id" goods.
     *
     * @param id the id of the goods to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/goods/{id}")
    public ResponseEntity<Void> deleteGoods(@PathVariable Long id) {
        log.debug("REST request to delete Goods : {}", id);
        goodsRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
