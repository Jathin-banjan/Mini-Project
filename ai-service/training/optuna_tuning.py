import os
import optuna
import tensorflow as tf
from app.config import Config
from app.model import build_heritage_cnn
from training.train import HeritageDataSequence

def objective(trial):
    # Hyperparameters to tune
    learning_rate = trial.suggest_float("learning_rate", 1e-5, 1e-3, log=True)
    dropout_rate = trial.suggest_float("dropout_rate", 0.2, 0.6)
    batch_size = trial.suggest_categorical("batch_size", [16, 32, 64])
    
    train_dir = os.path.join(Config.DATASET_DIR, "train")
    val_dir = os.path.join(Config.DATASET_DIR, "validation")
    
    train_seq = HeritageDataSequence(train_dir, batch_size=batch_size, is_training=True)
    val_seq = HeritageDataSequence(val_dir, batch_size=batch_size, is_training=False)
    
    model = build_heritage_cnn(learning_rate=learning_rate, dropout_rate=dropout_rate)
    
    # Train for short evaluation epochs during tuning
    history = model.fit(
        train_seq,
        validation_data=val_seq,
        epochs=10,
        verbose=0
    )
    
    val_acc = history.history["val_accuracy"][-1]
    return val_acc

def run_optuna_study(n_trials=5):
    print(f"[Optuna Tuning] Starting hyperparameter optimization study ({n_trials} trials)...")
    optuna.logging.set_verbosity(optuna.logging.WARNING)
    study = optuna.create_study(direction="maximize")
    study.optimize(objective, n_trials=n_trials)
    
    print("[Optuna Tuning] Best Trial:")
    print(f"  Value (Val Acc): {study.best_value}")
    print("  Params:")
    for key, val in study.best_params.items():
        print(f"    {key}: {val}")
    return study.best_params

if __name__ == "__main__":
    run_optuna_study(n_trials=5)
