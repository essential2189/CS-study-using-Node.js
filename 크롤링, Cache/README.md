## π΄Β μ€νμ μ£Όμ μ¬ν­

- μ²¨λΆλ [`package.json`](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/6ea890f84ade304c7b296dbcb229d89093e5f9a6/package.json)μ μ΄μ©ν΄μ£ΌμΈμ.
- ν°λ―Έλμ `npm install package.json`μ νμλ©΄ μμ½κ² μ€μΉ κ°λ₯ν©λλ€.
<br/><br/><br/>

- κ²μ νλ‘κ·Έλ¨(main.js) μ€νμ ν€μλ μλ ₯μ ν¬λ‘€λ§μ΄ μλ£λ νμ ν΄μ£ΌμΈμ.
  - λλ¬΄ λΉ λ₯΄κ² μ°μμ μΌλ‘ μλ ₯νλ©΄ μλ ₯μ΄ κΌ¬μλλ€.
- κ²μ νλ‘κ·Έλ¨(main.js)μ exitλ‘ μ’λ£ν  μ μμ΅λλ€.
<br/>

- Max keyword : cacheμ μ μ₯λ  μ΅λ keyword κ°―μ.
- Max data : ν¬λ‘€λ§ν  μ΅λ λ°μ΄ν° κ°―μ.

# μ²΄ν¬λ¦¬μ€νΈ

## ν€μλ κ²μ ν¬λ‘€λ§
 - [x] κ°λ° μΈμ΄μ κ°λ° νκ²½μ λ§μΆ°μ, κ²μ μλΉμ€μμ κ²μ κ²°κ³Όλ₯Ό ν¬λ‘€λ§νλ λ°©λ², λͺ¨λμ μ°Ύμμ νμ΅νλ€.
 - [X] node.js κΈ°λ° ν¬λ‘€λ§ μ²λ¦¬ λκ΅¬ λλ λͺ¨λμ νμ©νλ€.
 - [x] κ²μ κ²°κ³Ό HTMLμμ μ λͺ©, λ§ν¬ μ£Όμ, λ―Έλ¦¬λ³΄κΈ° λ΄μ©μ μΆμΆνλλ‘ κ΅¬ννλ€.

## κ²μ νλ‘κ·Έλ¨
 - [x] κ²μν ν€μλλ μ΅κ·Όμ κ²μν λ¨μ΄λ₯Ό λ¨κΈ°κΈ° μν΄μ LRU μΊμμ μ μ₯νλ€.
 - [x] LRU μΊμ μ μ₯ν  μ μλ ν€μλ κ°μμ ν€μλλ³ λ°μ΄ν° κ°μλ μμ± λλ μ΄κΈ°ν μμ μ μ§μ ν  μ μμ΄μΌ νλ€.
   - [x] LRU μΊμκ° μ΅κ·Όμ κ²μν λ¨μ΄λ 5κ°, λ°μ΄ν°λ 10κ°κΉμ§ κΈ°λ‘νλλ‘ μ΄κΈ°ννλ€.
   - [x] LRU μΊμ κΈ°λ‘μ μ μ±μ μΌλ‘ λ³κ²½ν  μ μλλ‘ κ΅¬ννκ³  λ°κΏκ°λ©΄μ νμΈν΄λ³Έλ€.
 - [x] μΊμλ set λμκ³Ό get λμμ λͺ¨λ κ΅¬ννλ€.
   - [x] μΊμμμ get ν  λλ§λ€ hitκ° λλ©΄ hitCountλ₯Ό μ¦κ°μν¨λ€.
   - [x] μΊμμ setν  λλ μ΄μ μ λμΌν ν€κ° μμΌλ©΄ μλ°μ΄νΈνλ€.
   - [x] ν€κ° μμΌλ©΄ LRU μΊμμμ κ°μ₯ μ€λμ μ κ²μν κ²μ μ§μ°κ³  μλ‘ μΆκ°νλ€.
 - [x] μΊμμ μ μ₯ν  λλ ν€μλμ κ²°κ³Όκ° 1:n κ΅¬μ‘°λ₯Ό κ°μ§λλ‘ μ μ₯ν  λ°μ΄ν° κ΅¬μ‘°μ λν΄ μ λ¦¬νλ€.
 - [x] LRU μΊμλ₯Ό μ μ₯λ λ¨μ΄μΈμ§ μ°μ  νμΈνκ³ , μμ κ²½μ°λ μ μ₯λ λ΄μ©μ μ΄μ©ν΄μ νμνλ€.
 - [x] μΊμμμ μ°Ύμμ νμνλ κ²½μ°λ μΊμλ μ λ³΄λΌλ κ²μ νμνλ€.
 - [x] ν€μλμ $cacheλ₯Ό μλ ₯νλ©΄ νμ¬ LRU μΊμμ μ μ₯λ ν€μλ λͺ©λ‘κ³Ό hitCountλ₯Ό μΆλ ₯νλ€.

 - [x] λ¦¬νν λ§
   - [x] κ°λμ± λμ΄κΈ°
   - [x] μ£Όμ λ¬κΈ°
   - [x] νμΌ λΆλ¦¬νκΈ°
  
## κ²°κ³Ό
ν€μλ κ²μ ν¬λ‘€λ§ - [crawling.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/243b523a3bcafcc06c76a1be6baeb10c820d73ad/crawling.js)
![craw_result.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/craw_result.png)


κ²μ νλ‘κ·Έλ¨ - [main.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/main.js) , [lru_cache.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/5dcb1f83851f86d4835626e4605dadd6c62b2a6c/lru_cache.js) , [web_crawling.js](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/5dcb1f83851f86d4835626e4605dadd6c62b2a6c/web_crawling.js)
![result1.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/result1.png)
![result2.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/result2.png)
![result3.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/72d73b83e6176df66ea0c11e6696cd34d18f533b/result3.png)


LRU μ€ν μμ - κ°λμ±μ μν΄ μλ μ¬μ§μ apple, google, naver μμΌλ‘ κ²μν νμ μ¬μ§μλλ€. (μ²« $cache κ²°κ³Ό νμΈ)
```
(LRU size : 3)

apple, google, naver μμΌλ‘ κ²μ μ.

[apple(1)] β [google(1)] β [naver(1)] νμμΌλ‘ μ μ₯λ©λλ€.

μ¬κΈ°μ google κ²μ μ. μλ‘ κ²μν googleμ΄ λ§¨ λ€λ‘ κ°κ²λ©λλ€.
κ·Έ κ²°κ³Ό,
[apple(1)] β [naver(1)] β [google(2)] νμμΌλ‘ λ°λκ²λ©λλ€.

κ·Έλ¦¬κ³  newλ₯Ό κ²μνκ² λλ©΄, 
κ°μ₯ μ€λλ apple(1)μ΄ μ­μ λκ³  newκ° λ§¨λ€μ μΆκ°λ©λλ€.

[naver(1)] β [google(2)] β [new(1)] νμμΌλ‘ λ°λκ²λ©λλ€.

```
![LRU.png](https://gist.githubusercontent.com/essential2189/ddb7a51dd3ff344bc6623d6135a6f08f/raw/0dd55132f543b983bbcc26f694f40242fdeb48fc/LRU.png)


# νμ΅ λ©λͺ¨

nodejs ν¬λ‘€λ§
https://goodmemory.tistory.com/83

https://velog.io/@yesdoing/Node.js-%EC%97%90%EC%84%9C-%EC%9B%B9-%ED%81%AC%EB%A1%A4%EB%A7%81%ED%95%98%EA%B8%B0-wtjugync1m

https://blog.uniony.me/nodejs/crawler/

https://thisisprogrammingworld.tistory.com/136


node js undefined μ²λ¦¬
https://mrb18.tistory.com/entry/%EC%9E%90%EC%A3%BC-%ED%97%B7%EA%B0%88%EB%A6%AC%EB%8A%94-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-if%EB%AC%B8%EC%9C%BC%EB%A1%9C-undefined-%EC%B2%B4%ED%81%AC%ED%95%A0%EB%95%8C-%EB%B2%88%EC%99%B8-Null%EC%B2%B4%ED%81%AC

nodejs dictionary
https://ourcstory.tistory.com/158

λ¬Έμμ΄ μλ₯΄κΈ°
https://gent.tistory.com/414


require vs import
https://inpa.tistory.com/entry/NODE-%F0%9F%93%9A-require-%E2%9A%94%EF%B8%8F-import-CommonJs%EC%99%80-ES6-%EC%B0%A8%EC%9D%B4-1

class μμ
https://fenderist.tistory.com/313

module
https://abbo.tistory.com/151

https://velog.io/@grinding_hannah/JavaScript-Import-Export%EB%A1%9C-%EB%AA%A8%EB%93%88%ED%99%94%ED%95%98%EA%B8%B0