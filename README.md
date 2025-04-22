
# Swans Front-End

## Как клонировать репозиторий?

```bash
git clone https://github.com/lebedev05tmn/swans-fe.git
cd swans-fe
```

## Как запушить изменения, если еще нет ветки `dev`?

```bash
git add .
git commit -m "layout: example feature"
git push origin main
```

## Методология работы с ветками

### 1. Создание новой ветки для разработки
Все изменения должны вестись в ветках, созданных от `development`.  
Для добавления новой функциональности создавайте ветку с названием `feature/имя_задачи`. Например:
```bash
git checkout development
git pull origin development
git checkout -b feature/SWA-4
```

Для исправления ошибок создавайте ветку с названием `bugfix/имя_задачи`. Например:
```bash
git checkout development
git pull origin development
git checkout -b bugfix/SWA-5
```

### 2. Работа над задачей
После создания ветки вносите необходимые изменения, а затем фиксируйте их в коммитах:
```bash
git add .
git commit -m "feat: добавлена новая функциональность"
```

### 3. Пуш ветки
Пушьте свою ветку на удаленный репозиторий:
```bash
git push origin feature/SWA-4
```

### 4. Создание Pull Request
После завершения работы создайте Pull Request из своей ветки (`feature/имя_задачи` или `bugfix/имя_задачи`) в ветку `development`.

- Убедитесь, что все автоматические тесты проходят.
- Добавьте описание задачи и список изменений.

### 5. Мёрдж изменений
После ревью и утверждения, мёрджите вашу ветку в `development`.

### 6. Слияние с `main`
Когда ветка `development` содержит стабильную версию проекта, создайте Pull Request из `development` в `main`. Это делается для подготовки к релизу.

---

## Задача: Обновить локальную ветку слиянием изменений из `origin/develop`

1. **Переключитесь на вашу локальную ветку, например, `feature/SWA-4`:**
   ```bash
   git checkout feature/SWA-4
   ```

2. **Скачайте последние изменения из удаленного репозитория:**
   ```bash
   git pull
   ```

3. **Выполните слияние изменений из ветки `origin/develop` в текущую ветку:**
   ```bash
   git merge origin/develop
   ```

4. **Разрешите конфликты (если они возникнут):**
   - Откройте файлы с конфликтами и вручную внесите изменения.
   - После этого добавьте исправленные файлы в индекс:
     ```bash
     git add имя-файла
     ```
   - Зафиксируйте изменения после разрешения конфликтов:
     ```bash
     git commit -m "Resolved merge conflicts"
     ```

5. **Убедитесь, что всё прошло успешно:**
   - Проверьте состояние репозитория:
     ```bash
     git status
     ```
   - Запустите локальные тесты или выполните проверку кода.

6. **Отправьте изменения обратно в удаленный репозиторий (если требуется):**
   ```bash
   git push origin feature/SWA-4
   ```


## UI-KIT FE
- [Ссылка на Gluestack UI-KIT](https://gluestack.io/)
- [Figma: Gluestack UI Design Kit](https://www.figma.com/community/file/1358053104938234615/gluestack-ui-v2-0-design-kit)
- [Figma: Актуальная разработка](https://www.figma.com/design/Dc7Udvm94UvYIdK0eiG9B0/Swans-project?node-id=0-1&t=p5YUeWB4GgeNrt9S-1)